import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import FeatureToggleController from "../../../../../public/api/university/FeatureToggleController";
import FeatureToggleName from "../../../../../public/constants/university/FeatureToggleName";
import FeatureToggleSwitch from "../../../../../public/components/switch";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const featureTogglesData = await FeatureToggleController.getAllFeatureToggles();
    if (featureTogglesData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                featureToggles: featureTogglesData.response
            }
        }
    }
}


export default function FeatureToggleList({isPagePermissionSuccess, operationUserId, featureToggles}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÜNİVERSİTE EKRAN YÖNETİMİ
                    </a>
                </div>
                {(
                    featureToggles.length !== 0
                        ?
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                            <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    EKRAN İSMİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    BAŞLAMA TARİHİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    BİTİŞ TARİHİ
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {featureToggles.map((featureToggle) => (
                                                <tr key={featureToggle.id}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                {FeatureToggleName.getAll.map((ftName) => (
                                                                    featureToggle.name === ftName.enum
                                                                        ?
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">
                                                                            {ftName.tr}
                                                                        </div>
                                                                        :
                                                                        null
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaLight text-xl text-sis-darkblue">
                                                                    {featureToggle.startDate}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaLight text-xl text-sis-darkblue">
                                                                    {featureToggle.endDate}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {FeatureToggleName.getAll.map((ftName) => (
                                                        featureToggle.name === ftName.enum
                                                            ?
                                                            ftName.switch === true
                                                                ?
                                                                <td className="px-2 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <div className="ml-4">
                                                                            <FeatureToggleSwitch
                                                                                isToggleEnabled={featureToggle.isEnabled}
                                                                                operationUserId={operationUserId}
                                                                                toggleName={featureToggle.name}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                :
                                                                <td>
                                                                </td>
                                                            :
                                                            null
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                )}
            </div>
        </div>
    )
}
