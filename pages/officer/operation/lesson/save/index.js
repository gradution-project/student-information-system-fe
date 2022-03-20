import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import SisOperationButton from "../../../../../public/components/buttons/SisOperationButton";
import DepartmentController from "../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../public/constants/department/DepartmentStatus";
import LessonController from "../../../../../public/api/lesson/LessonController";
import LessonCompulsoryOrElective from "../../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonSemester from "../../../../../public/constants/lesson/LessonSemester";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const departmentsData = await DepartmentController.getAllDepartmentsByStatus(DepartmentStatus.ACTIVE);
    if (departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                departments: departmentsData.response
            }
        }
    }
}

export default function SaveLesson({isPagePermissionSuccess, operationUserId, departments}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();


    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/lesson").then(() => router.reload());
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
    }

    function openFailSaveNotification() {
        setIsOpenFailSaveNotification(true);
    }

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }

    const [departmentId, setDepartmentId] = useState();
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [name, setName] = useState();
    const changeName = event => {
        const name = event.target.value;
        setName(name);
    }

    const [credit, setCredit] = useState();
    const changeCredit = event => {
        const credit = event.target.value;
        setCredit(credit);
    }

    const [compulsoryOrElective, setCompulsoryOrElective] = useState();
    const changeCompulsoryOrElective = event => {
        const compulsoryOrElective = event.target.value;
        setCompulsoryOrElective(compulsoryOrElective);
    }

    const [semester, setSemester] = useState();
    const changeSemester = event => {
        const semester = event.target.value;
        setSemester(semester);
    }

    const lessonSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const lessonInfo = {departmentId, name, credit, compulsoryOrElective, semester}
        const lessonData = await LessonController.saveLesson(operationUserId, lessonInfo);
        if (lessonData.success) {
            closeProcessingSaveNotification();
            openSuccessSaveNotification();
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none mt-10 py-4 sm:mt-0">
                <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={lessonSave}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="bg-white sm:p-6">
                            <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                    DERS EKLEME
                                </h3>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        DERSİN ADI
                                    </label>
                                    <input
                                        onChange={changeName}
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="credit"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        DERSİN KREDİSİ
                                    </label>
                                    <input
                                        onChange={changeCredit}
                                        type="text"
                                        name="credit"
                                        id="credit"
                                        required
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="semester"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        DERS DÖNEMİ
                                    </label>
                                    <select
                                        onChange={changeSemester}
                                        id="semester"
                                        name="semester"
                                        className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option>Ders Yarıyılı Seçiniz...</option>
                                        {LessonSemester.getAll.map(lSemester => (
                                            <option key={lSemester.enum}
                                                    value={lSemester.enum}>{lSemester.tr}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="compulsoryOrElective"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        DERS ZORUNLULUĞU
                                    </label>
                                    <select
                                        onChange={changeCompulsoryOrElective}
                                        id="compulsoryOrElective"
                                        name="compulsoryOrElective"
                                        className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option>Ders Durumunu Seçiniz...</option>
                                        {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                            <option key={lCompulsory.enum}
                                                    value={lCompulsory.enum}>{lCompulsory.tr}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="department"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        BÖLÜM ADI
                                    </label>
                                    <select
                                        onChange={changeDepartmentId}
                                        id="department-id"
                                        name="department-id"
                                        autoComplete="department-id"
                                        className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option>Ders Seçiniz...</option>
                                        {departments.map((department) => (
                                            <option key={department.departmentId}
                                                    value={department.departmentId}>{department.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {SisOperationButton.getSaveButton("KAYDET")}
                        </div>

                        <ProcessNotification
                            isOpen={isOpenProcessingSaveNotification}
                            closeNotification={closeProcessingSaveNotification}
                            title="Ders Ekleme İsteğiniz İşleniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="Ders Ekleme İşlemi Başarılı!"
                            description="Ders Ekleme İşlemi başarıyla gerçekleşti.
                            Mesaj penceresini kapattıktan sonra bölüm listeleme ekranına yönlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="Ders Ekleme İşlemi Başarısız!"
                            description="Lütfen girdiğiniz verileri kontrol ediniz.
                            Verilerinizi doğru girdiyseniz
                            sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}