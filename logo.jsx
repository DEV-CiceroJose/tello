export function Logo({ className }) {
  return (
    <span className={className}>
      <span className="wordmark">
        <img src="/favicon.svg" width="35" height="35" alt="" style={{ marginRight: 10 }} />
        tello<span className="brand-dot">.</span>
      </span>
    </span>
  );
}
