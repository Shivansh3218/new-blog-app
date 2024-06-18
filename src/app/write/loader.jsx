const LoadingOverlay = () => (
    <div style={{
      position: 'fixed', // Overlay covers the whole screen
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      zIndex: 1000, // Ensure it's above other content
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <span>Loading...</span>
      </div>
    </div>
  );
  export default LoadingOverlay;