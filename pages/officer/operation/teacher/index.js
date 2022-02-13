import SISTitle from "../../../../public/components/page-titles";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import {teacherDegrees, teacherRoles, teacherStatuses} from "../../../../public/constants/teacher";


export async function getServerSideProps() {
    const teacherResponse = await fetch("http://localhost:8585/teacher?status=ALL", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const teachersData = await teacherResponse.json();
    if (teachersData.success) {
        return {
            props: {teachers: teachersData.response}
        }
    }
}

export default function TeacherList({teachers}) {

    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/teacher/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none px-28 py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÖĞRETMEN LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        ÖĞRETMEN EKLE
                    </button>
                </div>
                {(
                    teachers !== null
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
                                                    AKADEMİK BİLGİLER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    BÖLÜM ADI
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
                                            {teachers.map((teacher) => (
                                                <tr key={teacher.teacherId}>
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
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{teacher.name} {teacher.surname}</div>
                                                                <div
                                                                    className="font-phenomenaRegular text-lg text-gray-500">{teacher.teacherId}</div>
                                                                <div
                                                                    className="font-phenomenaExtraLight text-lg text-gray-600">{teacher.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {teacherRoles.map((tRole) => (
                                                            teacher.role === tRole.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{tRole.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                        {teacherDegrees.map((tDegree) => (
                                                            teacher.degree === tDegree.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaRegular text-xl text-sis-darkblue">{tDegree.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                        <div className="font-phenomenaLight text-lg text-gray-500">{teacher.fieldOfStudy}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{teacher.departmentResponse.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {teacherStatuses.map((tStatus) => (
                                                            teacher.status === tStatus.enum
                                                                ?
                                                                tStatus.miniComponent
                                                                :
                                                                null
                                                        ))}
                                                    </td>
                                                    <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                        <a href={'/officer/operation/teacher/information/detail/' + teacher.teacherId}
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
