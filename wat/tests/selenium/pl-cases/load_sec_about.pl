$sel->click_ok("css=div.js-help-menu.menu > ul > li.menu-option[data-target=\"about\"]");
WAIT: {
    for (1..60) {
        if (eval { $sel->is_element_present("css=div.sec-about") }) { pass; last WAIT }
        sleep(1);
    }
    fail("timeout");
}
