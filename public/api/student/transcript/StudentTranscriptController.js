
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getStudentTranscriptDetailByStudentId = async (studentId) => {
    try {
        const apiResult = await fetch(`${SIS_API_URL}/student/transcript/by/student/${studentId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        });
        return await apiResult.json();
    } catch (error) {
        return error.code
    }
};

const StudentTranscriptController = {
    getStudentTranscriptDetailByStudentId
};

export default StudentTranscriptController;