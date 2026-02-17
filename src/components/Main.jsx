// src/components/Main.js

// Main content wrapper – accepts children from routes
function Main({ children }) {
  return (
    <main className="main-content">
      {children}
    </main>
  );
}

export default Main;