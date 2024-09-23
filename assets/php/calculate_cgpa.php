<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['gpa'])) {
        $gpas = array_filter($_POST['gpa'], function($value) {
            return is_numeric($value);
        });

        if (count($gpas) > 0) {
            $totalGPA = array_sum($gpas);
            $count = count($gpas);
            $cgpa = $totalGPA / $count;
            echo number_format($cgpa, 2);
        } else {
            echo '0.00';
        }
    } else {
        echo '0.00';
    }
}
?>
