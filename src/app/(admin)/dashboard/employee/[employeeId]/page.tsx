import { provinceDetail } from "@/app/api/address";
import DistrictTable from "@/components/admin/address/district.table";
import EmployeeView from "@/components/admin/employee/employee.view";
import ProfileView from "@/components/admin/employee/profile/profile.view";
import { Segmented, Select, SelectProps } from "antd";

const Profile = async ({ params }: { params: { employeeId: string } }) => {
    const { employeeId } = params;
    return (
        <div>
            <h1>Profile of {employeeId}</h1>
            <ul>
                <EmployeeView userId={employeeId} />
            </ul>
        </div>
    );
};

export default Profile;
