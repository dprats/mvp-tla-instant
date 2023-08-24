export default function MonacoTextEditorContainer({ children }) {
    return (
      <div className="container" style={{ padding: "10px", backgroundColor: "#F5F5F5" }}> 
        <h3 className="text-base font-semibold leading-6 text-gray-900">
            TLA+ Editor
        </h3>
        {children}
      </div>
    );
  }
  
