export default function SidenavHeader({ open }) {
  return (
    <div className="bg-white  flex items-center justify-center mb-6 pb-6 pt-3 sticky top-0 z-10">
      {!open ? (
        <img
          src="../../../assets/Subtract.svg"
          alt="Buy like"
          style={{ width: '30px' }}
        />
      ) : (
        <img
          src="../../../assets/Logo.svg"
          alt="Buy like"
          style={{ minWidth: '200px' }}
        />
      )}
    </div>
  );
}
