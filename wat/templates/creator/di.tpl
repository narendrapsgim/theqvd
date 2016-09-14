<table>
    <tr>
        <td data-i18n="Description"></td>
        <td>
            <textarea id="name" type="text" name="description" data-i18n="[placeholder]No changes"></textarea>
        </td>
    </tr>
    <tr>
        <td data-i18n="Image's source"></td>
        <td>
            <select class="" id="images_source" name="images_source" data-any-selected>
                <option value="computer" data-i18n="Your computer"></option>
                <option value="staging" data-i18n="Staging directory"></option>
                <option value="url" data-i18n="URL"></option>
            </select>
        </td>
    </tr>
    <tr class="image_staging_row" style="display: none;">
        <td data-i18n="Disk image"></td>
        <td>
            <select class="" name="disk_image" id="disk_image"></select>
        </td>
    </tr>
    <tr class="image_computer_row">
        <td data-i18n="Disk image"></td>
        <td>
            <form id="form_file_update">
            <input type="file" name="disk_image_file" class="col-width-100" data-required></select>
            </form>
        </td>
    </tr>
    <tr class="image_url_row">
        <td data-i18n="Disk image's URL"></td>
        <td>
            <input type="text" name="disk_image_url" class="col-width-100" data-required></select>
        </td>
    </tr>
    <% 
    if (Wat.C.checkACL('di.create.version')) { 
    %>
    <tr>
        <td data-i18n="Version"></td>
        <td>
            <input type="text" name="version" value="">
            <div class="second_row">
                (<span data-i18n="Leave it blank to set an automatic version based on creation date"></span>)
            </div>
        </td>
    </tr>
    <% 
    }
    %>
    <tr>
        <td data-i18n="OS Flavour"></td>
        <td>
            <select class="" name="osf_id" data-any-selected></select>
        </td>
    </tr>
    <% 
    if (Wat.C.checkACL('di.create.default')) { 
    %>
    <tr>
        <td>Default</td>
        <td class="cell-check">
             <input type="checkbox" name="default" value="1">
        </td>
    </tr>
    <% 
    }
    if (Wat.C.checkACL('di.create.tags')) { 
    %>
    <tr>
        <td data-i18n="Tags"></td>
        <td>
            <input type="text" class="" name="tags" value="<%= model.get('tags') %>">
        </td>
    </tr>
    <% 
    }
    %>
 </table>