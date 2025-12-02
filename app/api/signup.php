<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	$error = "Oops! Something's wrong. Try again later";

	echo json_encode($error);
}
