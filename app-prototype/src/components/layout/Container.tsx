// src/components/layout/Container.tsx
export default function Container({ children, className = "" }: any) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}
