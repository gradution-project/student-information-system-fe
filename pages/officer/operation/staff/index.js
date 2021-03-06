import SISTitle from "../../../../public/components/page-titles";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../401";
import OfficerController from "../../../../public/api/officer/OfficerController";
import OfficerStatus from "../../../../public/constants/officer/OfficerStatus";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const officersData = await OfficerController.getAllOfficersByStatus(OfficerStatus.ALL);
    if (officersData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                officers: officersData.response
            }
        }
    }
}

export default function OfficerList({isPagePermissionSuccess, officers}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/staff/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        PERSONEL LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        PERSONEL EKLE
                    </button>
                </div>
                {(
                    officers.length !== 0
                        ?
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                            <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    ADI SOYADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    FAKÜLTE ADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    STATÜSÜ
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {officers.map((officer) => (
                                                <tr key={officer.officerId}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {/*<td className="px-6 py-4 whitespace-nowrap">*/}
                                                        <div className="flex items-center">
                                                            {/*<div className="flex-shrink-0 h-10 w-10">*/}
                                                            {/*    <img className="select-none h-10 w-10 rounded-full"*/}
                                                            {/*         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"*/}
                                                            {/*         alt=""/>*/}
                                                            {/*</div>*/}
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{officer.name} {officer.surname}</div>
                                                                <div
                                                                    className="font-phenomenaRegular text-lg text-gray-500">{officer.officerId}</div>
                                                                <div
                                                                    className="font-phenomenaExtraLight text-lg text-gray-600">{officer.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{officer.facultyResponse.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {OfficerStatus.getAll.map((oStatus) => (
                                                            officer.status === oStatus.enum
                                                                ?
                                                                oStatus.miniComponent
                                                                :
                                                                null
                                                        ))}
                                                    </td>
                                                    <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                        <a href={`/officer/operation/staff/information/detail/${officer.officerId}`}
                                                           className='text-sis-yellow'>
                                                            DETAY
                                                        </a>
                                                    </td>
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
