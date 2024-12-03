
function Fonts(){

    const fonts = [
        "Arial",              // Sans-serif
        "Verdana",            // Sans-serif
        "Helvetica",          // Sans-serif
        "Tahoma",             // Sans-serif
        "Trebuchet MS",       // Sans-serif
        "Times New Roman",    // Serif
        "Georgia",            // Serif
        "Garamond",           // Serif
        "Courier New",        // Monospace
        "Lucida Console",     // Monospace
        "Monaco",             // Monospace
        "Brush Script MT",    // Cursive
        "Comic Sans MS",      // Cursive
      ];
      
      const newFonts = fonts.map((value, idx) => {
        return (
            <option key={value+idx}>{value}</option>
        )
      })

    return(
        <select className="form-select">
            {newFonts}
        </select>
    )
}

export default Fonts;