import SISTitle from "../../../public/components/page-titles";
import OfficerNavbar from "../../../public/components/navbar/officer/officer-navbar";


export default function Department() {
    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <form className="px-4 py-12 max-w-2xl mx-auto space-y-6">
                <div className="py-2 px-4 shadow overflow-hidden sm:rounded-md">
                    <div className="sm:col-span-4">
                        <label htmlFor="department"
                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                            FAKÜLTE
                        </label>
                        <select
                            id="department"
                            name="department"
                            autoComplete="department-name"
                            className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                        >
                            <option>MÜHENDİSLİK-MİMARLIK FAKÜLTESİ</option>
                        </select>
                    </div>

                    <div className="sm:col-span-6 py-8">
                        <label htmlFor="teacher-number"
                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                            BÖLÜM İSMİ
                        </label>
                        <input
                            type="text"
                            name="teacher-number"
                            id="teacher-number"
                            value=""
                            className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                        >
                            KAYDET
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}