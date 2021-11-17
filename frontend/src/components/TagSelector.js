import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

const TagSelector = (props) => {

    return (
        <div>
<Autocomplete
        multiple
        id="tags-outlined"
        options={["Sonnet", "Haiku", "Limmerick", "Rhyming", "Sad", "Happy", "Imagery", "Free Verse", "Nature"]}
        onChange={(event, value) => props.handleTagChange(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Choose User Tags"
          />
        )}
      />
      </div>
        )
        }

        export default TagSelector;