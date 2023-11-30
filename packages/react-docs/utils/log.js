import debug from 'debug';

const log = {
  debug: debug('app:debug'),
  info: debug('app:info'),
  warning: debug('app:warning'),
  error: debug('app:error'),
};

debug.formatArgs = formatArgs;

function formatArgs(args) {
  const name = this.namespace;
  const useColors = true;
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const space = '                       ';
  const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' - ');
  const dateTime = '[' + str + ']';
  let prefix = '';
  if (useColors) {
    const c = this.color;
    const colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    prefix = ' ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';
    args[0] = dateTime + prefix + args[0].split('\n').join('\n' + space + prefix);
    args.push(colorCode + 'm+' + debug.humanize(this.diff) + '\u001b[0m');
  } else {
    prefix = ' ' + name + ' ';
    args[0] = dateTime + prefix + args[0].split('\n').join('\n' + space + prefix);
    args.push(debug.humanize(this.diff));
  }
}

export default log;
