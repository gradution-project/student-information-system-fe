import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";

export default function Student() {
    const [degree, setDegree] = useState();

    const [departmentId, setDepartmentId] = useState();

    const [classLevel, setClassLevel] = useState();

    const [name, setName] = useState();

    const [surname, setSurname] = useState();

    const [tcNo, setTcNo] = useState();

    const [birthday, setBirthday] = useState();

    const [email, setEmail] = useState();

    const [phoneNumber, setPhoneNumber] = useState();

    const [address, setAddress] = useState();

    const changeDegree = event => {
        const degree = event.target.value;
        setDegree(degree);
    }

    const changeDepartmentId = event => {
        const department = event.target.value;
        setDepartmentId(department);
    }
    const changeClassLevel = event => {
        const classLevel = event.target.value;
        setClassLevel(classLevel);
    }

    const changeStudentName = event => {
        const name = event.target.value;
        setName(name);
    }

    const changeSurname = event => {
        const surname = event.target.value;
        setSurname(surname);
    }

    const changeTcNo = event => {
        const tc = event.target.value;
        setTcNo(tc);
    }

    const changeBirthday = event => {
        const birthday = event.target.value;
        setBirthday(birthday);
    }

    const changeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }

    const changePhoneNumber = event => {
        const phone = event.target.value;
        setPhoneNumber(phone);
    }

    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const saveStudent = async () => {
        await fetch("http://localhost:8585/student/save", {
            body: JSON.stringify({
                academicInfoRequest: {
                    classLevel: classLevel,
                    degree: degree,
                    departmentId: departmentId
                }, personalInfoRequest: {
                    address: address,
                    birthday: birthday,
                    email: email,
                    name: name,
                    phoneNumber: phoneNumber,
                    surname: surname,
                    tcNo: tcNo
                },
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
    }
    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={saveStudent}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
                                    <h3 className="mt-4 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                        ÖĞRENCİ EKLEME
                                    </h3>
                                </div>
                                <div className="bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="sm:col-span-2">
                                            <label htmlFor="class-level"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SINIF
                                            </label>
                                            <input
                                                onChange={changeClassLevel}
                                                type="text"
                                                name="class-level"
                                                id="class-level"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVAN
                                            </label>
                                            <select
                                                onChange={changeDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="department-name"
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>LİSANS</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜM
                                            </label>
                                            <select
                                                onChange={changeDepartmentId}
                                                id="department"
                                                name="department"
                                                autoComplete="department-name"
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>BİLGİSAYAR MÜHENDİSLİĞİ</option>
                                            </select>
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                onChange={changeStudentName}
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeSurname}
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                onChange={changeTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                onChange={changeBirthday}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                onChange={changePhoneNumber}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                maxLength="13"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                onChange={changeAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"

                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        KAYDET
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>
        </div>
    )
}