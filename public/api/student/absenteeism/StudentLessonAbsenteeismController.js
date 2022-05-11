
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsLessonsAbsenteeismByLessonId = async (lessonId, week) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism/by/lesson/${lessonId}?week=${week}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getAllStudentLessonsAbsenteeismByStudentId = async (studentId, week) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/absenteeism/by/student/${studentId}?week=${week}`, {
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

const StudentLessonAbsenteeismController = {
    getAllStudentsLessonsAbsenteeismByLessonId,
    getAllStudentLessonsAbsenteeismByStudentId,
    getTotalLessonAbsenteeismWeek
};

export default StudentLessonAbsenteeismController;