export function SkeletonCard() {
  return (
    <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden"  data-testid="skeleton-card">
      <div className="bg-light p-3 h-100">
        <div className="placeholder-glow mb-2">
          <div
            className="placeholder w-100 rounded"
            style={{
              height: "130px",
              background:
                "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
              backgroundSize: "200% 100%",
              animation: "shine 1.5s infinite",
            }}
          ></div>
        </div>

        <div className="placeholder-glow mt-3">
          <span className="placeholder w-75 rounded"></span>
        </div>
        <div className="placeholder-glow mt-2">
          <span className="placeholder w-25 rounded"></span>
        </div>
      </div>

      <style>
        {`
      @keyframes shine {
        to { background-position-x: -200%; }
      }
    `}
      </style>
    </div>
  );
}
