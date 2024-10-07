import { provinceDetail } from "@/app/api/address";
import DistrictTable from "@/components/admin/address/district.table";
import { Select, SelectProps } from "antd";

interface District {
    id: string;
    name: string;
}

const ProvinceDistricts = async ({ params }: { params: { provinceId: string } }) => {
    const { provinceId } = params;
    const province = await provinceDetail(provinceId);
    return (
        <div>
            <h1>Districts of {province.data.name}</h1>
            <ul>
                <DistrictTable
                    province={province.data}
                />
            </ul>
        </div>
    );
};

export default ProvinceDistricts;
