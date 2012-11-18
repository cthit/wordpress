<?php
	global $post;
	
	$main_location = "about";
	$about_menu = get_menu_by_location($main_location);

	$sec_location = "comittees";
	$sec_menu = get_menu_by_location($sec_location);
?>

<nav class="box side-nav">
	<h2><a href="<?php link_to("sektionen");?>"><?php echo esc_html($about_menu->name);?></a></h2>
	
	<?php wp_nav_menu(array(
		"theme_location" => $main_location,
		"container_class" => "",
		"menu_class" => "",
		"container" => false
	)); ?>
	
	<section>
		<h4><?php echo esc_html($sec_menu->name);?></h4>
		<?php wp_nav_menu(array(
			"theme_location" => $sec_location,
			"container_class" => "",
			"menu_class" => "",
			"container" => false
		)); ?>
	</section>
</nav>