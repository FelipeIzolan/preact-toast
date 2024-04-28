# 🍞 preact-toast

![image](https://github.com/FelipeIzolan/preact-toast/assets/80170121/f6b0e4ad-b410-45c1-95ca-233dfff71125)

```
npm install preact-toast
```
```jsx
import toast, { Toaster } from 'preact-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

# 📄 Documentation

**toast**

```ts
toast(message: string) // <- 3000ms and top-right
toast(message: string, ms: number) // <- custom ms and top-right
toast(message: string, config: ToastConfig) // <- custom toast (look src/types.ts)
```
[type.ts](https://github.com/FelipeIzolan/preact-toast/blob/main/src/types.ts)

**Toaster**
```tsx
<Toaster
  position="top-right" // <- default toast-position
  style={} // <- default toast-style
  className={} // <- default toast-class
/>
```

# 📜 License

- [preact-toast](https://github.com/FelipeIzolan/preact-toast) - MIT
- [preact](https://github.com/preactjs/preact) - MIT
