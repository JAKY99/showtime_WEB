import { environment } from "environments/environment";

export class GlobalConstants {
  public static readonly API_URL = environment.apiUrl;
  public static readonly TOKEN_HEADER_KEY = "Authorization";
  public static readonly TOKEN_HEADER_KEY_REFRESH = "Refresh";
  public static readonly WEBSOCKET_URL = environment.webSocketUrl;
  public static readonly ENV = environment.env;
}
