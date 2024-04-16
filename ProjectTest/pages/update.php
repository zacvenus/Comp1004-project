<?php
$jsonFile = 'Item.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    if (isset($_POST['value'])) 
    {
        //find and decode contents of sent data
        $newValue = $_POST['value'];
        $jsonData = file_get_contents($jsonFile);
        $data = json_decode($jsonData, true);
        //check if decode success
        if ($data !== null && is_array($data)) 
        {
            // Update the value in the JSON data
            $data['value'] = $newValue;
            $updatedJsonData = json_encode($data, JSON_PRETTY_PRINT);
            file_put_contents($jsonFile, $updatedJsonData);

            // Send a success or fail response
            http_response_code(200);
        } else 
        {
            http_response_code(500);
        }
    } 
    else 
    {
        http_response_code(400);
    }
} 
?>
