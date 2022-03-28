import { useState } from 'react'
import { Tab } from '@headlessui/react'
import SisStudentStorage from "../../../../public/storage/student/SisStudentStorage";
import UnauthorizedAccessPage from "../../../401";
import StudentNavbar from "../../../../public/components/navbar/student/student-navbar";
import LessonSemester from "../../../../public/constants/lesson/LessonSemester";
import LessonCompulsoryOrElective from "../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonController from "../../../../public/api/lesson/LessonController";
import LessonStatus from "../../../../public/constants/lesson/LessonStatus";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }
    const lessonsData = await LessonController.getAllLessonsByStatus(LessonStatus.ALL);
    if (lessonsData.success && lessonsData) {
        return {
            props: {
                isPagePermissionSuccess: true,
                lessons: lessonsData.response,
            }
        }
    }

}

export default function LessonRegistration({isPagePermissionSuccess,lessons}) {
    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }

    const [studentLessons] = useState([]);
    const [studentLessonIds] = useState([]);
    const insertLesson = async (lesson) => {
            studentLessonIds.push(lesson.lessonId)
            studentLessons.push(lesson)
        console.log(studentLessonIds)
    }

    const [semesters] = useState({
        '1. Sınıf': [],
        '2. Sınıf': [],
        '3. Sınıf': [],
        '4. Sınıf': [],
    })

    return (
       <div>
           <StudentNavbar/>
           <div className="select-none px-28 py-5 mx-auto space-y-6">
               <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                   <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                       DERS KAYIT
                       <button
                           type="submit"
                           className="font-phenomenaBold float-right mr-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                       >
                           DANIŞMAN ONAYINA GÖNDER
                       </button>
                   </a>
               </div>
           <div className="w-full max-w-7xl px-4">
               <Tab.Group>
                   <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                       {Object.keys(semesters).map((semester) => (
                           <Tab
                               key={semester}
                               className={({ selected }) =>
                                   classNames(
                                       'w-full py-2.5 text-sm leading-5 font-phenomenaExtraBold text-sis-yellow rounded-lg',
                                       'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sis-yellow ring-white ring-opacity-60',
                                       selected
                                           ? 'bg-white shadow'
                                           : 'text-sis-yellow hover:bg-white/[0.12] hover:text-sis-lightblue'
                                   )
                               }
                           >
                               {semester}
                           </Tab>
                       ))}
                   </Tab.List>
                   <Tab.Panels className="mt-2">
                       {Object.values(semesters).map(() => (
                           <Tab.Panel>
                               <ul>
                                   {lessons.map((lesson) => (
                                       <li
                                           key={lesson.lessonId}
                                           className="relative p-3 rounded-md hover:bg-coolGray-100"
                                       >
                                           <h3 className="text-lg font-phenomenaExtraBold text-sis-darkblue leading-5">
                                               {lesson.lessonId} - {lesson.name}
                                               <a className='text-sis-success float-right'>
                                                   <button onClick={() => insertLesson(lesson)}>
                                                       DERS EKLE
                                                   </button>
                                               </a>
                                           </h3>

                                           <ul className="flex mt-1 space-x-1 text-sm font-phenomenaRegular leading-4 text-sis-darkblue">
                                               {LessonSemester.getAll.map((lSemester) => (
                                                   lesson.semester === lSemester.enum
                                                       ?
                                                       <li>{lSemester.tr},</li>
                                                       :
                                                       null
                                               ))}
                                               <li>Krd: {lesson.credit},</li>
                                               {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                   lesson.compulsoryOrElective === lCompulsory.enum
                                                       ?
                                                       <li>{lCompulsory.tr}</li>
                                                       :
                                                       null
                                               ))}
                                           </ul>
                                       </li>

                                   ))}
                               </ul>
                           </Tab.Panel>
                       ))}
                       <table id="tableLesson" className="mt-8 bg-gray-50 min-w-full divide-y divide-gray-200 shadow-xl">
                           <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                           <tr>
                               <th
                                   scope="col"
                                   className="select-none px-6 py-3 tracking-wider"
                               >
                                   DERSLERİM
                               </th>
                           </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-gray-200">
                           {studentLessons.map((studentLesson) => (
                               <tr key={studentLesson.lessonId}>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex items-center">
                                           <div className="ml-0.5">
                                               <div className="font-phenomenaBold text-lg text-sis-darkblue">{studentLesson.lessonId} - {studentLesson.name}</div>
                                           </div>
                                       </div>
                                   </td>
                                   <td className="whitespace-nowrap">
                                       <div className="flex items-center">
                                           <div className="ml-0.5">
                                               <div className="font-phenomenaBold text-lg text-sis-darkblue">{studentLesson.departmentResponse.name}</div>
                                               <div className="font-phenomenaBold text-lg text-sis-darkblue">Krd:{studentLesson.credit}</div>
                                           </div>
                                       </div>
                                   </td>
                                   <td className="whitespace-nowrap">
                                       <div className="px-48 flex items-center">
                                           <div className="ml-0.5">
                                               <div className="font-phenomenaBold text-lg text-sis-darkblue">
                                                   {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                       studentLesson.compulsoryOrElective === lCompulsory.enum
                                                           ?
                                                           <div>{lCompulsory.tr}</div>
                                                           :
                                                           null
                                                   ))}</div>
                                           </div>
                                       </div>
                                   </td>

                               </tr>
                           ))}
                           </tbody>
                       </table>
                   </Tab.Panels>
               </Tab.Group>
              </div>
           </div>
       </div>
    )
}
