# TDesign 站点相关代码

### 开发

初次开发需要初始化子仓库
```
git submodule init 
git submodule update
```

tdesign-site: `npm run dev:site`

tdesign-site-components: `npm run dev:components`

## publish
```bash
# 发布 tdesign-site-components
git tag components-x.x.x
git push origin components-x.x.x
```
