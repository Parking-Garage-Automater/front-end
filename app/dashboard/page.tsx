import SideNav from "@/components/side-nav";
import Header from "../header";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideNav />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
            <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className='flex gap-2 pt-3'>
                <div className="flex gap-4">
                  <button className="w-40 h-16 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Dashboard</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}