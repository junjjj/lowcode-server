export const compile = function (json) {
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
