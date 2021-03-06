import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

const TagSelector = (props) => {

    return (
        <div class= "p-10 gap-2 transition-all hover:scale-105">
<Autocomplete
        multiple
        position='absolute'
        id="tags-outlined"
        options={["Sonnet", "Haiku", "Limmerick", "Rhyming", "Sad", "Happy", "Imagery", "Free Verse", "Nature"]}
        onChange={(event, value) => props.handleTagChange(event, value)}
        value={props.value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Choose Poem Tags"
          />
        )}
      />
      </div>
        )
        }

        export default TagSelector;