<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['cgpa']) && isset($_POST['formula'])) {
        $cgpa = floatval($_POST['cgpa']);
        $formula = $_POST['formula'];

        switch ($formula) {
            case '9.5':
                $percentage = $cgpa * 9.5;
                break;
            case '25':
                if ($cgpa >= 0 && $cgpa <= 4.0) {
                    $percentage = $cgpa * 25;
                } else {
                    echo "Please enter a CGPA between 0 and 4.";
                    exit();
                }
                break;
            case '0.714':
                $percentage = ($cgpa / 7.1) * 100;
                break;
            default:
                echo "Invalid formula selected.";
                exit();
        }

        echo "Your percentage is: " . number_format($percentage, 2) . "%";
    } else {
        echo "CGPA or formula is not set.";
    }
} else {
    echo "Invalid request.";
}
?>
