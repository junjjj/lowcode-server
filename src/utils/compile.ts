import { existsSync, writeFileSync } from 'fs';
import { exec, execSync } from 'child_process';
export const compile = async function (json) {
  console.log('传递过来的 JSON 文件', json);

  const data = {
    state: {},
    props: {},
    computed: {},
    handlers: {},
  };

  // 生成模板
  const template = compileTemplate(json, data);

  console.log(template, '\n', data);
  // 输出目录
  const output = './output';

  const isExist = await existsSync(output);

  console.log(isExist);
  if (isExist) {
    // 创建
    await execSync(`rm -rf ${output}`);
  }

  await execSync(`mkdir ${output}`);

  let script = `<script setup>\n`;
  if (Object.keys(data.handlers).length) {
    script += `import { ${Object.keys(data.handlers).join(
      ', ',
    )} } from './handlers'\n`;
  }

  if (Object.keys(data.props).length) {
    let keys = '{';

    for (const key in data.props) {
      keys += `${key}: ${data.props[key]}`;
    }

    keys += '}';
    script += `
      const { ${Object.keys(data.props).join(', ')} } = defineProps(${keys})
    `;
  }

  script += `</script>`;

  await writeFileSync(
    `${output}/index.vue`,
    `<template>
      ${template}
    </template>
    ${script}
    `,
    'utf-8',
  );

  let handler = '';
  for (const key in data.handlers) {
    handler += `export const ${key} = ${data.handlers[key]}\n`;
  }

  // 生成 handler.ts
  await writeFileSync(`${output}/handlers.ts`, `${handler}`, 'utf-8');
  console.log('生成完成✅');
};

const compileTemplate = (json, data) => {
  console.log(json);
  const { tag, children, props, events, text } = json;
  let html = '';

  html += `<${tag}`;

  if (events) {
    for (const key in events) {
      html += ` @${key}="`;
      html += `${Object.keys(events[key]).join(', ')}`;
      html += `"`;

      for (const event in events[key]) {
        data.handlers[event] = events[key][event];
      }
    }
  }

  html += `>`;

  if (children) {
    for (const subHTML of children) {
      html += compileTemplate(subHTML, data);
    }
  }

  if (props) {
    for (const prop in props) {
      html += `{{ ${prop} }}`;
    }

    data.props = {
      ...data.props,
      ...props,
    };
  }

  if (text) {
    html += `${text}`;
  }

  html += `</${tag}>`;
  return html;
};
