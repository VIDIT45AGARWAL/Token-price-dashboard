

const Navbar = () => {
  return (
    <>
        <nav>
            <div className="bg-black p-4 px-10 flex flex-row justify-between border border-b-4 border-b-gray-500">
                <div className="text-emerald-500 text-3xl font-bold flex flex-row items-center">
                    <i className='bx bx-stats'></i> TokenTrak
                </div>

                <div className="bg-emerald-500 rounded-2xl p-3 text-white font-bold">
                    Connect Wallet
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar