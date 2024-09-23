<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['grade']) && isset($_POST['credit'])) {
        $grades = $_POST['grade'];
        $credits = $_POST['credit'];

        $totalCredits = 0;
        $totalPoints = 0;

        for ($i = 0; $i < count($grades); $i++) {
            $grade = floatval($grades[$i]);
            $credit = floatval($credits[$i]);

            $totalCredits += $credit;
            $totalPoints += $grade * $credit;
        }

        if ($totalCredits > 0) {
            $gpa = $totalPoints / $totalCredits;
            echo number_format($gpa, 2);
        } else {
            echo "Total credits must be greater than zero.";
        }
    } else {
        echo "Grade or credit hours are not set.";
    }
} else {
    echo "Invalid request.";
}
?>
