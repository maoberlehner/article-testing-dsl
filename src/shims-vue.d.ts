declare module `*.vue` {
  import { DefineComponent } from 'vue';

  let component: DefineComponent<{}, {}, any>;
  export default component;
}
