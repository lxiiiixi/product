import RouterApp from "@/sections/RouterApp";

import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
    return (
        <div className={process.env.NODE_ENV === "development" ? "debug-screens" : ""}>
            <RouterApp />
        </div>
    );
}

export default App;
