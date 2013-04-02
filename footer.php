	
	<br class="clear" />
	
	<?php if(is_active_sidebar("footer")) : ?>
	
	<section class="footer-widgets">
		<ul>
		<?php dynamic_sidebar("footer"); ?>
		</ul>
	</section>
	<?php endif;?>

</section> <!-- role main end -->

<footer role="contentinfo" itemscope itemtype="http://schema.org/EducationalOrganization">
	<div class="wrapper group">
		<section class="four columns">
			<a class="block footer-home-link" href="<?php bloginfo("url");?>">
				<hgroup itemprop="description">
					<h1>
						Informationsteknik
					</h1>
					<h2>
						Chalmers Tekniska Högskola
					</h2>
				</hgroup>
			</a>
			
			<nav>
				<?php wp_nav_menu(array(
					"theme_location" => "footer_navigation",
					"container_class" => "",
					"menu_class" => "footer-nav",
					"container" => false
				)); ?>
			</nav>
		</section>
		
		<section class="four columns">
			<dl class="footer-contact">
				<dt>Kontakt</dt>
				<dd><a href="mailto:<?php it_option("main_contact_email");?>"><?php it_option("main_contact_email");?></a></dd>
				
				<dt>Postadress</dt>
				<dd itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<span itemprop="name"><?php it_option("contact_official_name");?></span><br />
					<span itemprop="streetAddress"><?php it_option("contact_address");?></span><br />
					<span itemprop="postalCode"><?php it_option("postal_code");?></span>
					<span itemprop="addressLocality"><?php it_option("locality");?></span>
				</dd>

				<dt>Besöksadress</dt>
				<dd><a href="https://maps.google.se/maps?f=q&source=s_q&hl=sv&geocode=&q=H%C3%B6rsalsv%C3%A4gen+9,+412+58+G%C3%B6teborg,+V%C3%A4stra+G%C3%B6talands+l%C3%A4n&aq=&sll=57.688606,11.979255&sspn=0.001761,0.005059&vpsrc=0&ie=UTF8&hq=&hnear=H%C3%B6rsalsv%C3%A4gen+9,+412+58+G%C3%B6teborg&ll=57.688288,11.979454&spn=0.007042,0.020235&t=m&z=16&iwloc=A">
					Hubben 2.1<br />
					Hörsalsvägen 6<br />
					412 58 Göteborg
				</a></dd>
			</dl>
		</section>
		
		<section class="four columns">
			<?php
				$walker = new Comittee_Walker;
			?>

			<dl>
			<?php wp_nav_menu(array(
				"theme_location" => "comittees",
				"container_class" => "",
				"menu_class" => "",
				"container" => false,
				"items_wrap" => '%3$s',
				"walker" => $walker
			)); ?>
			</dl>
		</section>
	</div>
</footer>

<?php wp_footer(); ?>

<?php if(is_production()) : ?>

<script src="<?php javascript_path("all.min");?>"></script>

<?php else : ?>
<script src="<?php javascript_path("jquery.smoothscroll");?>"></script>
<script src="<?php javascript_path("jquery.autosize");?>"></script>
<script src="<?php javascript_path("jquery.tipsy");?>"></script>
<script src="<?php javascript_path("jquery.modal");?>"></script>
<script src="<?php javascript_path("chalmersit.courses");?>"></script>
<script src="<?php javascript_path("chalmersit");?>"></script>
<?php endif;?>

<?php if(is_home()):?>
<script type="text/javascript">
	$(function() {
		// "Load more posts"
		$.loadMorePosts(".news");
	});
</script>
<?php endif;?>

<!-- Created by digIT 12/13. Designed by Johan on a Mac -->

</body>
</html>