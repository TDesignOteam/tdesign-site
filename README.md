# TDesign site related code

### Dev

Initial development needs to initialize the submodule.
```bash
git submodule init 
git submodule update
```

tdesign-site: `npm run dev:site`

tdesign-site-components: `npm run dev:components`

## Publish

### publish tdesign-site-components

After modifying `components/package.json` the release version will be automatically triggered by the workflow.
