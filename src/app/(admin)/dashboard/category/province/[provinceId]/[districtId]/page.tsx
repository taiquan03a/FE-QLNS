import { districtDetail, provinceDetail } from "@/app/api/address";
import DistrictTable from "@/components/admin/address/district.table";
import WardTable from "@/components/admin/address/ward.table";
import { Select, SelectProps } from "antd";

interface District {
    id: string;
    name: string;
}

const DistrictWards = async ({ params }: { params: { districtId: string } }) => {
    const { districtId } = params;
    const district = await districtDetail(districtId);
    console.log('district->', district);
    return (
        <div>
            <h1>Ward of {district.data.name}</h1>
            <ul>
                <WardTable
                    province={district.data}
                />
            </ul>
        </div>
    );
};

export default DistrictWards;
