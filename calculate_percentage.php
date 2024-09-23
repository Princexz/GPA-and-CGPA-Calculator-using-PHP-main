<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['percentage']) && isset($_POST['formula'])) {
        $percentage = floatval($_POST['percentage']);
        $formula = $_POST['formula'];

        switch ($formula) {
            case '9.5':
                $cgpa = $percentage / 9.5;
                break;
            case '25':
                if ($percentage >= 0 && $percentage <= 100) {
                    $cgpa = $percentage / 25;
                } else {
                    echo "Please enter a percentage between 0 and 100.";
                    exit();
                }
                break;
            case '0.714':
                $cgpa = ($percentage * 7.1) / 100;
                break;
            default:
                echo "Invalid formula selected.";
                exit();
        }

        echo "Your CGPA is: " . number_format($cgpa, 2);
    } else {
        echo "Percentage or formula is not set.";
    }
} else {
    echo "Invalid request.";
}
?>
