import SISTitle from "../../../public/components/page-titles";
import OfficerNavbar from "../../../public/components/navbar/officer/officer-navbar";

export default function Student() {
    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <form className="px-28 py-5 mx-auto space-y-6" action="/student" method="POST">
                <div>
                    <div className="px-12 py-10 text-right font-phenomenaRegular float-right content-">
                        <a href="/officer/student-insert"
                           className="px-4 py-1 bg-sis-success text-sis-white rounded-md font-phenomenaRegular">
                            ÖĞRENCİ EKLEME
                        </a>
                    </div>
                    <div className="px-12 py-4 text-left sm:px-6 bg-gray-50">
                        <h3 className="mt-4 font-phenomenaExtraBold text-left text-4xl text-sis-darkblue mb-6">
                            ÖĞRENCİ LİSTESİ
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ADI SOYADI
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            AKADEMİK BİLGİLER
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            DURUM
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Sil</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{}</div>
                                                    <div className="text-sm font-medium text-gray-900">{}</div>
                                                    <div className="text-sm text-gray-500">{}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{}</div>
                                            <div className="text-sm text-gray-500">{}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {}
                      </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-sis-fail hover:text-sis-fail">
                                                SİL
                                            </a>
                                        </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
