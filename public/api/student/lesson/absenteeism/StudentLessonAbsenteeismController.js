
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsLessonsAbsenteeismByLessonId = async (lessonId, week) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism/by/lesson/${lessonId}?week=${week}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getAllStudentLessonsAbsenteeismByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism/by/student/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getTotalLessonAbsenteeismWeek = async () => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism/total/week`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const updateStudentsLessonAbsenteeism = async (operationUserId, absenteeismIdsAndTheoreticalHoursAndPracticeHours) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            absenteeismIdsAndTheoreticalHoursAndPracticeHours,
            operationInfoRequest: {
                userId: operationUserId
            }
        })
    });
    return await apiResult.json();
};

const StudentLessonAbsenteeismController = {
    getAllStudentsLessonsAbsenteeismByLessonId,
    getAllStudentLessonsAbsenteeismByStudentId,
    getTotalLessonAbsenteeismWeek,
    updateStudentsLessonAbsenteeism
};

export default StudentLessonAbsenteeismController;