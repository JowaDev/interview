'use client'

import {FC, useContext} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCarousel} from "@/components/ui/carousel";
import {globalContext} from "@/components/GlobalContext";

interface SkillsFormProps {

}

export const SkillsForm: FC<SkillsFormProps> = () => {
    const {skills, setSkills} = useContext(globalContext);
    const {scrollNext} = useCarousel()
    const handleAddSkill = () => {
        setSkills([...skills, '']);
    };

    const handleSkillChange = (index: number, value: string) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
    };

    const handleRemoveSkill = (index: number) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };

    return (
        <div>
            {skills.map((skill, i) => (
                <div key={i} className="flex mb-2">
                    <Input
                        type="text"
                        placeholder={`Skill ${i + 1}`}
                        value={skill}
                        onChange={(e) => handleSkillChange(i, e.target.value)}
                        className='flex flex-grow'
                    />
                    {
                        i > 0 && (
                            <Button
                                type="button"
                                onClick={() => handleRemoveSkill(i)}
                                className='ml-4'
                            >
                                Supprimer
                            </Button>
                        )
                    }
                </div>
            ))}
            <div className="flex justify-between mt-36">
                <Button
                    type="button"
                    onClick={handleAddSkill}
                >
                    Ajouter un skill
                </Button>
                <Button
                    type="button"
                    onClick={skills[0].length > 0 ? scrollNext : undefined}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
}
