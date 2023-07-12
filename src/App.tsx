import RouterApp from '@/sections/RouterApp';

function App() {
  return (
    <div
      className={process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}
    >
      <RouterApp />
    </div>
  );
}

export default App;
