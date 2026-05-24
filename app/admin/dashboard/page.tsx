import GetMeApi from "@/services/getMe";
import { redirect } from "next/navigation";
``;
const dashboardPage = async () => {
  return (
    <div className=" container">
      <div className="">
        <div className="border border-gray-500 rounded-md p-2 ">
          {" "}
          <div>Halo</div>
          <div>Admin</div>
          <div>Telah datang</div>
        </div>
      </div>
    </div>
  );
};

export default dashboardPage;
