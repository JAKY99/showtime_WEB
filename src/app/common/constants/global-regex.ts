export class GlobalRegex {
  public static readonly emailRegex: RegExp = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
  public static readonly permissionTypeRegex: RegExp = new RegExp('^(?:\\w+:){1,1}(?:\\w+)$');
}
