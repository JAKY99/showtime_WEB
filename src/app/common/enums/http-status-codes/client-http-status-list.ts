import { ClientHttpStatus } from "./client-http-status"

export function getStatusInfo(statusCode:number):ClientHttpStatus{
  let statusInfo:ClientHttpStatus = {
    statusCode:statusCode,
    message:'null',
    type:'null',
    viewable:false
  }
  switch(statusCode){
    case 400:
      statusInfo.message = "Bad Request";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 401:
      statusInfo.message = "Unauthorized";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 402:
      statusInfo.message = "Payment Required";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 403:
      statusInfo.message = "Forbidden";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 404:
      statusInfo.message = "Not Found";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 405:
      statusInfo.message = "Method Not Allowed";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 406:
      statusInfo.message = "Not Acceptable";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 407:
      statusInfo.message = "Proxy Authentication Required";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 408:
      statusInfo.message = "Request Timeout";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 409:
      statusInfo.message = "Conflict";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 410:
      statusInfo.message = "Gone";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 411:
      statusInfo.message = "Length Required";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 412:
      statusInfo.message = "Precondition Failed";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 413:
      statusInfo.message = "Payload Too Large";
      statusInfo.type = "ClientError";
      statusInfo.viewable = true;
      break;
    case 414:
      statusInfo.message = "URI Too Long";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 415:
        statusInfo.message = "Unsupported Media Type";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 416:
        statusInfo.message = "Requested Range Not Satisfiable";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 417:
        statusInfo.message = "Expectation Failed";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 418:
        statusInfo.message = "I'm a teapot";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 419:
        statusInfo.message = "Authentication Timeout";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 420:
        statusInfo.message = "Enhance Your Calm";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 421:
        statusInfo.message = "Misdirected Request";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 422:
        statusInfo.message = "Unprocessable Entity";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 423:
        statusInfo.message = "Locked";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 424:
        statusInfo.message = "Failed Dependency";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 425:
        statusInfo.message = "Too Early";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 426:
        statusInfo.message = "Upgrade Required";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 428:
        statusInfo.message = "Precondition Required";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 429:
        statusInfo.message = "Too Many Requests";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 431:
        statusInfo.message = "Request Header Fields Too Large";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 440:
        statusInfo.message = "Login Timeout";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 444:
        statusInfo.message = "No Response";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 449:
        statusInfo.message = "Retry With";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 450:
        statusInfo.message = "Blocked by Windows Parental Controls";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 451:
        statusInfo.message = "Unavailable For Legal Reasons";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 494:
        statusInfo.message = "Request Header Too Large";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 495:
        statusInfo.message = "Certificate Error";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 496:
        statusInfo.message = "No Certificate";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 497:
        statusInfo.message = "HTTP to HTTPS";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 498:
        statusInfo.message = "Token expired/invalid";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 499:
        statusInfo.message = "Client Closed Request";
        statusInfo.type = "ClientError";
        statusInfo.viewable = true;
        break;
    case 500:
        statusInfo.message = "Internal Server Error";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 501:
        statusInfo.message = "Not Implemented";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 502:
        statusInfo.message = "Bad Gateway";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 503:
        statusInfo.message = "Service Unavailable";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 504:
        statusInfo.message = "Gateway Timeout";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 505:
        statusInfo.message = "HTTP Version Not Supported";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 506:
        statusInfo.message = "Variant Also Negotiates";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 507:
        statusInfo.message = "Insufficient Storage";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 508:
        statusInfo.message = "Loop Detected";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 509:
        statusInfo.message = "Bandwidth Limit Exceeded";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 510:
        statusInfo.message = "Not Extended";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 511:
        statusInfo.message = "Network Authentication Required";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 598:
        statusInfo.message = "Network read timeout error";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    case 599:
        statusInfo.message = "Network connect timeout error";
        statusInfo.type = "ServerError";
        statusInfo.viewable = true;
        break;
    default:
        statusInfo.message = "Unknown Error";
        statusInfo.type = "Unknown";
        statusInfo.viewable = true;
        break;
    }
    return statusInfo;
}

