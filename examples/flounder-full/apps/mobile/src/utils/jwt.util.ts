import jwtDecode from 'jwt-decode';

interface JWTToken {
  exp: number;
  iat: number;
}

export class JwtUtil {
  private decodeToken(token: string): JWTToken {
    return jwtDecode(token) as JWTToken;
  }

  isTokenExpired(token: string): boolean {
    const expiresMillis = this.decodeToken(token).exp * 1000;
    const nowMillis = Date.now();
    return expiresMillis < nowMillis;
  }
}
