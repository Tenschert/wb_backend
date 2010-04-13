<?php
        
        $file = 'rss_url.txt';
        // strip path up to ../modules/mod_directory/; for language files keep mod_directory (e.g. EN)
        $strip_path = WB_PATH . $path_sep . $addon_info['type'] . 's' .  
            (($addon_info['type'] != 'language') ? $path_sep . $addon_info['directory'] : '');

        // fetch content of specified file (read from file or take over from textarea)
        if ((isset($_POST['save_modified_textfile']) || isset($_POST['save_modified_textfile_back'])) && isset($_POST['code_area_text'])) {
            // take content from save request
            $file_content = $admin->strip_slashes($_POST['code_area_text']);
        } else {
            // open file and save data in variable
            $file_content = file_get_contents($file);
        }

        $tpl->set_var(array(
            'REGISTER_EDIT_AREA'        => myRegisterEditArea($syntax = myGetEditAreaSyntax($actual_file)),
            'ADDON_FILE'                => str_replace($strip_path, '', $actual_file),
            'FILE_CONTENT'                => htmlspecialchars($file_content),
            'URL_FORM_SUBMIT'            => $url_action_handler . '?aid=' . $aid . '&amp;fid=' . $fid . '&amp;action=1',
            'URL_FORM_CANCEL'            => $url_admintools . '&amp;aid=' . $aid
            )
        );

        // action save modified text file
        if ((isset($_POST['save_modified_textfile']) || isset($_POST['save_modified_textfile_back'])) && isset($_POST['code_area_text'])) {
            
            // save changes to text file
            $status = false;
            if (is_writeable($actual_file) && $handle = fopen($actual_file, 'wb')) {
                $status = fwrite($handle, $file_content);
            }

            $status_message = ($status) ? $LANG[4]['TXT_SAVE_SUCCESS'] : $LANG[4]['TXT_SAVE_ERROR'];
            $back_link = $url_admintools . '&aid=' . $aid . '&fid=' . $fid;

            $tpl->set_var(array(
                'STATUS_MESSAGE'        => writeStatusMessage($message = $status_message, $back_url = $back_link, $sucess = $status,
                                                $auto_redirect = ($status && isset($_POST['save_modified_textfile_back'])), 
                                                $redirect_timer = isset($_POST['save_modified_textfile_back']) ? 0 : 1500),
                'CLASS_HIDDEN'            => ''
                )
            );
        }

        $tpl->pparse('output', 'page');
        break;

?>
